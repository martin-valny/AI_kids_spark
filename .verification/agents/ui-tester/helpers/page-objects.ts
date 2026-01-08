import { Page, Locator } from '@playwright/test';

/**
 * Page Objects for AI Kids Spark UI Testing
 *
 * Encapsulates page interactions and element selectors
 * for cleaner, more maintainable tests.
 */

/**
 * Base Page Object with common functionality
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}

/**
 * Home Page Object
 */
export class HomePage extends BasePage {
  // Locators
  readonly heroSection: Locator;
  readonly navigationMenu: Locator;
  readonly lessonsButton: Locator;
  readonly drawingButton: Locator;
  readonly threeDButton: Locator;
  readonly musicButton: Locator;
  readonly videoButton: Locator;
  readonly chatbotButton: Locator;
  readonly headerTitle: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection = page.locator('[data-testid="hero-section"], .hero, main > section:first-child');
    this.navigationMenu = page.locator('nav, [role="navigation"]');
    this.lessonsButton = page.locator('a[href*="lessons"], button:has-text("Lessons")');
    this.drawingButton = page.locator('a[href*="drawing"], button:has-text("Drawing"), a:has-text("Art")');
    this.threeDButton = page.locator('a[href*="3d"], a[href*="three"], button:has-text("3D")');
    this.musicButton = page.locator('a[href*="music"], button:has-text("Music")');
    this.videoButton = page.locator('a[href*="video"], button:has-text("Video")');
    this.chatbotButton = page.locator('a[href*="chat"], button:has-text("Chat"), a:has-text("AI")');
    this.headerTitle = page.locator('h1');
    this.searchInput = page.locator('input[type="search"], input[placeholder*="search" i]');
  }

  async goToLessons(): Promise<void> {
    await this.lessonsButton.first().click();
    await this.waitForNavigation();
  }

  async goToDrawing(): Promise<void> {
    await this.drawingButton.first().click();
    await this.waitForNavigation();
  }

  async goTo3D(): Promise<void> {
    await this.threeDButton.first().click();
    await this.waitForNavigation();
  }

  async goToMusic(): Promise<void> {
    await this.musicButton.first().click();
    await this.waitForNavigation();
  }

  async searchForContent(query: string): Promise<void> {
    if (await this.searchInput.isVisible()) {
      await this.searchInput.fill(query);
      await this.page.keyboard.press('Enter');
      await this.waitForNavigation();
    }
  }
}

/**
 * Lessons Page Object
 */
export class LessonsPage extends BasePage {
  readonly lessonCards: Locator;
  readonly lessonTitles: Locator;
  readonly lessonCategories: Locator;
  readonly filterDropdown: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.lessonCards = page.locator('[data-testid="lesson-card"], .lesson-card, article');
    this.lessonTitles = page.locator('[data-testid="lesson-title"], .lesson-title, article h2, article h3');
    this.lessonCategories = page.locator('[data-testid="category"], .category, .tag');
    this.filterDropdown = page.locator('select, [role="combobox"]');
    this.backButton = page.locator('button:has-text("Back"), a:has-text("Back"), [aria-label="Back"]');
  }

  async selectLesson(index: number = 0): Promise<void> {
    const lessons = await this.lessonCards.all();
    if (lessons[index]) {
      await lessons[index].click();
      await this.waitForNavigation();
    }
  }

  async filterByCategory(category: string): Promise<void> {
    if (await this.filterDropdown.isVisible()) {
      await this.filterDropdown.selectOption(category);
      await this.page.waitForTimeout(500);
    }
  }

  async getLessonCount(): Promise<number> {
    return await this.lessonCards.count();
  }

  async goBack(): Promise<void> {
    if (await this.backButton.isVisible()) {
      await this.backButton.click();
      await this.waitForNavigation();
    }
  }
}

/**
 * Drawing Canvas Page Object
 */
export class DrawingPage extends BasePage {
  readonly canvas: Locator;
  readonly colorPicker: Locator;
  readonly brushSizeSlider: Locator;
  readonly clearButton: Locator;
  readonly saveButton: Locator;
  readonly undoButton: Locator;
  readonly redoButton: Locator;
  readonly toolButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.canvas = page.locator('canvas');
    this.colorPicker = page.locator('input[type="color"], [data-testid="color-picker"]');
    this.brushSizeSlider = page.locator('input[type="range"], [data-testid="brush-size"]');
    this.clearButton = page.locator('button:has-text("Clear"), [aria-label*="clear" i]');
    this.saveButton = page.locator('button:has-text("Save"), [aria-label*="save" i]');
    this.undoButton = page.locator('button:has-text("Undo"), [aria-label*="undo" i]');
    this.redoButton = page.locator('button:has-text("Redo"), [aria-label*="redo" i]');
    this.toolButtons = page.locator('[data-testid="tool-button"], .tool-button, button[aria-label*="tool" i]');
  }

  async drawLine(startX: number, startY: number, endX: number, endY: number): Promise<void> {
    const canvasBox = await this.canvas.boundingBox();
    if (!canvasBox) throw new Error('Canvas not found');

    await this.page.mouse.move(canvasBox.x + startX, canvasBox.y + startY);
    await this.page.mouse.down();
    await this.page.mouse.move(canvasBox.x + endX, canvasBox.y + endY);
    await this.page.mouse.up();
  }

  async selectColor(color: string): Promise<void> {
    if (await this.colorPicker.isVisible()) {
      await this.colorPicker.fill(color);
    }
  }

  async setBrushSize(size: number): Promise<void> {
    if (await this.brushSizeSlider.isVisible()) {
      await this.brushSizeSlider.fill(size.toString());
    }
  }

  async clearCanvas(): Promise<void> {
    if (await this.clearButton.isVisible()) {
      await this.clearButton.click();
    }
  }

  async saveDrawing(): Promise<void> {
    if (await this.saveButton.isVisible()) {
      await this.saveButton.click();
    }
  }
}

/**
 * Three.js/3D Page Object
 */
export class ThreeDPage extends BasePage {
  readonly canvas: Locator;
  readonly controlsPanel: Locator;
  readonly rotateButton: Locator;
  readonly zoomSlider: Locator;
  readonly resetViewButton: Locator;
  readonly modelSelector: Locator;

  constructor(page: Page) {
    super(page);
    this.canvas = page.locator('canvas');
    this.controlsPanel = page.locator('[data-testid="controls"], .controls-panel');
    this.rotateButton = page.locator('button:has-text("Rotate"), [aria-label*="rotate" i]');
    this.zoomSlider = page.locator('input[type="range"][aria-label*="zoom" i], [data-testid="zoom-slider"]');
    this.resetViewButton = page.locator('button:has-text("Reset"), [aria-label*="reset" i]');
    this.modelSelector = page.locator('select[aria-label*="model" i], [data-testid="model-selector"]');
  }

  async isCanvasRendering(): Promise<boolean> {
    const canvasCount = await this.canvas.count();
    if (canvasCount === 0) return false;

    return await this.page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
      return gl !== null;
    });
  }

  async rotateModel(): Promise<void> {
    if (await this.rotateButton.isVisible()) {
      await this.rotateButton.click();
    }
  }

  async zoomIn(): Promise<void> {
    if (await this.zoomSlider.isVisible()) {
      const currentValue = await this.zoomSlider.inputValue();
      const newValue = Math.min(100, parseInt(currentValue) + 10);
      await this.zoomSlider.fill(newValue.toString());
    }
  }

  async resetView(): Promise<void> {
    if (await this.resetViewButton.isVisible()) {
      await this.resetViewButton.click();
    }
  }
}

/**
 * Form Page Object (for interactive elements)
 */
export class FormPage extends BasePage {
  readonly textInputs: Locator;
  readonly submitButton: Locator;
  readonly requiredFields: Locator;
  readonly errorMessages: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.textInputs = page.locator('input[type="text"], input[type="email"], textarea');
    this.submitButton = page.locator('button[type="submit"], button:has-text("Submit")');
    this.requiredFields = page.locator('input[required], textarea[required], select[required]');
    this.errorMessages = page.locator('.error, [role="alert"], [aria-invalid="true"] + *');
    this.successMessage = page.locator('.success, [role="status"]');
  }

  async fillField(label: string, value: string): Promise<void> {
    const field = this.page.locator(`input[aria-label="${label}"], input[placeholder="${label}"]`);
    await field.fill(value);
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async getErrorMessages(): Promise<string[]> {
    const messages = await this.errorMessages.allTextContents();
    return messages;
  }

  async hasSuccessMessage(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}

/**
 * Navigation Component Object (for responsive nav testing)
 */
export class Navigation extends BasePage {
  readonly navBar: Locator;
  readonly menuButton: Locator;
  readonly mobileMenu: Locator;
  readonly navLinks: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    this.navBar = page.locator('nav, [role="navigation"]');
    this.menuButton = page.locator('button[aria-label*="menu" i], .hamburger, [data-testid="menu-button"]');
    this.mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, nav [role="menu"]');
    this.navLinks = page.locator('nav a, [role="navigation"] a');
    this.logo = page.locator('nav img, [role="navigation"] img, a[aria-label*="home" i]');
  }

  async toggleMobileMenu(): Promise<void> {
    if (await this.menuButton.isVisible()) {
      await this.menuButton.click();
      await this.page.waitForTimeout(300); // Wait for animation
    }
  }

  async isMobileMenuOpen(): Promise<boolean> {
    if (await this.mobileMenu.isVisible()) {
      const ariaExpanded = await this.menuButton.getAttribute('aria-expanded');
      return ariaExpanded === 'true';
    }
    return false;
  }

  async clickNavLink(text: string): Promise<void> {
    const link = this.navLinks.filter({ hasText: text }).first();
    await link.click();
    await this.waitForNavigation();
  }

  async goHome(): Promise<void> {
    await this.logo.click();
    await this.waitForNavigation();
  }
}
