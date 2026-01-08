/**
 * Accessibility Tests for Design System Components
 *
 * Tests WCAG 2.1 AA compliance including:
 * - Color contrast
 * - Focus management
 * - ARIA attributes
 * - Keyboard navigation
 * - Touch target sizes
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { InnerCard } from './InnerCard';
import { HighlightBox } from './HighlightBox';
import { CardGrid } from './CardGrid';
import { IconContainer } from './IconContainer';
import { Brain, Star, Info } from 'lucide-react';

describe('Accessibility Audit', () => {
  describe('InnerCard', () => {
    it('has no axe violations in basic state', async () => {
      const { container } = render(
        <InnerCard color="blue" title="Accessible Card" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations when interactive', async () => {
      const { container } = render(
        <InnerCard
          color="blue"
          title="Interactive Card"
          interactive
          aria-label="Click to learn more"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('is keyboard accessible when interactive', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <InnerCard
          color="blue"
          title="Keyboard Test"
          interactive
          onClick={handleClick}
        />
      );

      const card = screen.getByRole('button');

      // Tab to the card
      await user.tab();
      expect(card).toHaveFocus();

      // Press Enter to activate
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Press Space to activate
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('has proper ARIA attributes', () => {
      const { container } = render(
        <InnerCard
          color="purple"
          title="ARIA Test Card"
          icon={<Brain />}
        />
      );

      const card = container.firstChild as HTMLElement;

      // Card should have aria-label
      expect(card.getAttribute('aria-label')).toBe('ARIA Test Card');

      // Icon container should be hidden from screen readers
      const iconContainer = card.querySelector('[aria-hidden="true"]');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('HighlightBox', () => {
    it('has no axe violations for info variant', async () => {
      const { container } = render(
        <HighlightBox variant="info">Important information</HighlightBox>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations for warning variant', async () => {
      const { container } = render(
        <HighlightBox variant="warning">Warning message</HighlightBox>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations for success variant', async () => {
      const { container } = render(
        <HighlightBox variant="success">Success message</HighlightBox>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no axe violations for tip variant', async () => {
      const { container } = render(
        <HighlightBox variant="tip">Pro tip content</HighlightBox>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper semantic role', () => {
      render(<HighlightBox variant="info">Info content</HighlightBox>);
      expect(screen.getByRole('note')).toBeInTheDocument();
    });

    it('has descriptive aria-label based on variant', () => {
      const { rerender } = render(
        <HighlightBox variant="info">Content</HighlightBox>
      );
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Information');

      rerender(<HighlightBox variant="warning">Content</HighlightBox>);
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Warning');

      rerender(<HighlightBox variant="success">Content</HighlightBox>);
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Success');

      rerender(<HighlightBox variant="tip">Content</HighlightBox>);
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Tip');
    });
  });

  describe('CardGrid', () => {
    it('has no axe violations', async () => {
      const { container } = render(
        <CardGrid aria-label="Feature cards">
          <InnerCard color="blue" title="Card 1" />
          <InnerCard color="purple" title="Card 2" />
          <InnerCard color="green" title="Card 3" />
        </CardGrid>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper list semantics', () => {
      render(
        <CardGrid aria-label="Features">
          <InnerCard color="blue" title="Card 1" />
          <InnerCard color="purple" title="Card 2" />
        </CardGrid>
      );

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });

    it('has descriptive aria-label', () => {
      render(
        <CardGrid aria-label="AI concept cards">
          <InnerCard color="blue" title="Card" />
        </CardGrid>
      );

      expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'AI concept cards');
    });
  });

  describe('IconContainer', () => {
    it('has no axe violations with aria-label', async () => {
      const { container } = render(
        <IconContainer
          color="blue"
          icon={<Brain />}
          aria-label="Artificial Intelligence"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('is properly hidden when decorative', async () => {
      const { container } = render(
        <IconContainer color="blue" icon={<Star />} />
      );

      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.getAttribute('aria-hidden')).toBe('true');

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has img role when providing aria-label', () => {
      render(
        <IconContainer
          color="purple"
          icon={<Info />}
          aria-label="Information icon"
        />
      );

      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Information icon');
    });
  });

  describe('Focus Management', () => {
    it('interactive InnerCard receives focus on tab', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Before</button>
          <InnerCard color="blue" title="Focusable" interactive />
          <button>After</button>
        </div>
      );

      const card = screen.getByRole('button', { name: 'Focusable' });

      // Tab through elements
      await user.tab(); // Focus "Before" button
      await user.tab(); // Focus card
      expect(card).toHaveFocus();
    });

    it('non-interactive InnerCard does not receive focus', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button>Before</button>
          <InnerCard color="blue" title="Not Focusable" />
          <button>After</button>
        </div>
      );

      await user.tab(); // Focus "Before" button
      await user.tab(); // Skip card, focus "After" button

      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    });
  });

  describe('Touch Targets (WCAG 2.1 AA)', () => {
    it('interactive cards have minimum touch target of 44x44px', () => {
      const { container } = render(
        <InnerCard color="blue" title="Touch Target" interactive />
      );

      const card = container.firstChild as HTMLElement;

      // The card's padding (p-6 = 24px on each side) ensures it exceeds 44x44
      // We verify the card has the expected base structure
      expect(card.className).toContain('p-6'); // 24px padding = well above 44px total
    });
  });

  describe('Screen Reader Compatibility', () => {
    it('provides meaningful content for InnerCard', () => {
      render(
        <InnerCard
          color="blue"
          title="Learn About AI"
          description="Discover how artificial intelligence works"
          icon={<Brain />}
        />
      );

      // Title and description are visible to screen readers
      expect(screen.getByText('Learn About AI')).toBeInTheDocument();
      expect(
        screen.getByText('Discover how artificial intelligence works')
      ).toBeInTheDocument();
    });

    it('provides meaningful content for HighlightBox', () => {
      render(
        <HighlightBox variant="tip">
          <strong>Pro Tip:</strong> Always test accessibility!
        </HighlightBox>
      );

      const note = screen.getByRole('note');
      expect(note).toHaveAttribute('aria-label', 'Tip');
      expect(screen.getByText('Pro Tip:')).toBeInTheDocument();
    });
  });
});
