import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("abre em português por defeito", async ({ page }) => {
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A vida inspira e",
  );
});

test("muda para inglês e mantém a escolha depois de recarregar", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Mudar para inglês" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Life inspires",
  );

  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Life inspires",
  );
});

test("alterna o modo escuro e mantém a escolha", async ({ page }) => {
  const html = page.locator("html");
  const wasDark = ((await html.getAttribute("class")) ?? "").includes("dark");

  await page.getByRole("button", { name: /Mudar para modo/ }).click();
  await expect(html).toHaveClass(wasDark ? /light/ : /dark/);

  await page.reload();
  await expect(html).toHaveClass(wasDark ? /light/ : /dark/);
});

test("não tem scroll horizontal", async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("o botão 'Junta-te a nós' leva à secção de contacto", async ({ page }) => {
  await page.getByRole("link", { name: "Junta-te a nós" }).first().click();
  await expect(
    page.getByRole("heading", { name: "Faz parte do NEBe" }),
  ).toBeInViewport();
});

test.describe("navegação", () => {
  const sections = [
    {
      link: "Sobre nós",
      heading: "Somos a voz dos estudantes de Bioengenharia da UAlg",
    },
    { link: "Atividades", heading: "Aprender, explorar e conviver" },
    { link: "Agenda", heading: "Próximos eventos" },
    { link: "Recursos", heading: "Tudo o que precisas, num só sítio" },
  ];

  for (const { link, heading } of sections) {
    test(`a navbar faz scroll até "${link}"`, async ({ page, isMobile }) => {
      const nav = page.getByRole("navigation", { name: "Navegação principal" });
      if (isMobile) {
        await page.getByRole("button", { name: "Abrir menu" }).click();
        await page
          .locator("#mobile-menu")
          .getByRole("link", { name: link, exact: true })
          .click();
        await expect(page.locator("#mobile-menu")).toBeHidden();
      } else {
        await nav.getByRole("link", { name: link, exact: true }).click();
      }
      await expect(
        page.getByRole("heading", { name: heading }),
      ).toBeInViewport();
    });
  }
});
