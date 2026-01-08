import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InnerCard } from './InnerCard';
import { Brain } from 'lucide-react';

describe('InnerCard', () => {
  describe('rendering', () => {
    it('renders with required color prop', () => {
      const { container } = render(<InnerCard color="blue" />);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
      expect(card.className).toContain('border-kids-blue');
    });

    it('renders title when provided', () => {
      render(<InnerCard color="blue" title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<InnerCard color="blue" description="Test description" />);
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <InnerCard color="blue">
          <span>Child content</span>
        </InnerCard>
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      render(
        <InnerCard
          color="blue"
          title="With Icon"
          icon={<Brain data-testid="brain-icon" />}
        />
      );
      expect(screen.getByTestId('brain-icon')).toBeInTheDocument();
    });
  });

  describe('color variants', () => {
    const colors = ['blue', 'purple', 'green', 'pink', 'orange', 'yellow', 'red', 'teal'] as const;

    colors.forEach((color) => {
      it(`applies ${color} variant classes`, () => {
        const { container } = render(<InnerCard color={color} data-testid="card" />);
        const card = container.firstChild as HTMLElement;
        // Verify card has proper styling - each color should have border classes
        expect(card.className).toContain(`border-kids-${color}`);
      });
    });
  });

  describe('interactive mode', () => {
    it('has button role when interactive', () => {
      render(<InnerCard color="blue" interactive title="Interactive Card" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has no button role when not interactive', () => {
      render(<InnerCard color="blue" title="Non-interactive Card" />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('is focusable when interactive', () => {
      const { container } = render(<InnerCard color="blue" interactive />);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('tabIndex')).toBe('0');
    });

    it('is not focusable when not interactive', () => {
      const { container } = render(<InnerCard color="blue" />);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('tabIndex')).toBeNull();
    });

    it('applies hover classes when interactive', () => {
      const { container } = render(<InnerCard color="blue" interactive />);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('cursor-pointer');
    });
  });

  describe('accessibility', () => {
    it('uses title as aria-label when no custom aria-label provided', () => {
      const { container } = render(<InnerCard color="blue" title="Accessible Title" />);
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('aria-label')).toBe('Accessible Title');
    });

    it('uses custom aria-label when provided', () => {
      const { container } = render(
        <InnerCard color="blue" title="Title" aria-label="Custom Label" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.getAttribute('aria-label')).toBe('Custom Label');
    });

    it('hides icon from screen readers', () => {
      render(
        <InnerCard color="blue" icon={<Brain data-testid="icon" />} />
      );
      const iconContainer = screen.getByTestId('icon').parentElement;
      expect(iconContainer?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the div element', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<InnerCard color="blue" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom className', () => {
    it('merges custom className with default classes', () => {
      const { container } = render(
        <InnerCard color="blue" className="custom-class" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card.className).toContain('custom-class');
    });
  });
});
