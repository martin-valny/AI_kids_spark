import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconContainer } from './IconContainer';
import { Brain, Star } from 'lucide-react';

describe('IconContainer', () => {
  describe('rendering', () => {
    it('renders with required color prop', () => {
      render(<IconContainer color="blue" aria-label="Blue icon" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders icon from icon prop', () => {
      render(
        <IconContainer
          color="blue"
          icon={<Brain data-testid="brain-icon" />}
          aria-label="Brain icon"
        />
      );
      expect(screen.getByTestId('brain-icon')).toBeInTheDocument();
    });

    it('renders icon from children', () => {
      render(
        <IconContainer color="blue" aria-label="Star icon">
          <Star data-testid="star-icon" />
        </IconContainer>
      );
      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    });

    it('icon prop takes precedence over children', () => {
      render(
        <IconContainer
          color="blue"
          icon={<Brain data-testid="brain-icon" />}
          aria-label="Icons test"
        >
          <Star data-testid="star-icon" />
        </IconContainer>
      );
      expect(screen.getByTestId('brain-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('star-icon')).not.toBeInTheDocument();
    });
  });

  describe('color variants', () => {
    const colors = ['blue', 'purple', 'green', 'pink', 'orange', 'yellow', 'red', 'teal'] as const;

    colors.forEach((color) => {
      it(`applies ${color} background and text color`, () => {
        const { container } = render(
          <IconContainer color={color} aria-label={`${color} icon`} />
        );
        const iconContainer = container.firstChild as HTMLElement;
        expect(iconContainer.className).toContain(`bg-kids-${color}`);
      });
    });
  });

  describe('sizes', () => {
    it('applies small size classes', () => {
      const { container } = render(
        <IconContainer color="blue" size="sm" aria-label="Small icon" />
      );
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).toContain('w-8');
      expect(iconContainer.className).toContain('h-8');
    });

    it('applies medium size classes (default)', () => {
      const { container } = render(
        <IconContainer color="blue" aria-label="Medium icon" />
      );
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).toContain('w-12');
      expect(iconContainer.className).toContain('h-12');
    });

    it('applies large size classes', () => {
      const { container } = render(
        <IconContainer color="blue" size="lg" aria-label="Large icon" />
      );
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).toContain('w-16');
      expect(iconContainer.className).toContain('h-16');
    });
  });

  describe('animations', () => {
    it('includes scale animation class by default', () => {
      const { container } = render(
        <IconContainer color="blue" aria-label="Animated icon" />
      );
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).toContain('group-hover:scale-110');
    });

    it('excludes scale animation when animateOnGroupHover is false', () => {
      const { container } = render(
        <IconContainer
          color="blue"
          animateOnGroupHover={false}
          aria-label="Static icon"
        />
      );
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).not.toContain('group-hover:scale-110');
    });
  });

  describe('accessibility', () => {
    it('has role="img"', () => {
      render(<IconContainer color="blue" aria-label="Test icon" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('uses provided aria-label', () => {
      render(<IconContainer color="blue" aria-label="Custom label" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Custom label');
    });

    it('is hidden from screen readers when no aria-label provided', () => {
      const { container } = render(<IconContainer color="blue" />);
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.getAttribute('aria-hidden')).toBe('true');
    });

    it('is not hidden when aria-label is provided', () => {
      const { container } = render(
        <IconContainer color="blue" aria-label="Visible icon" />
      );
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.getAttribute('aria-hidden')).toBe('false');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the div element', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<IconContainer color="blue" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom className', () => {
    it('merges custom className with default classes', () => {
      const { container } = render(
        <IconContainer color="blue" className="custom-class" />
      );
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).toContain('custom-class');
      expect(iconContainer.className).toContain('rounded-xl'); // Still has base classes
    });
  });

  describe('styling', () => {
    it('has rounded corners', () => {
      const { container } = render(<IconContainer color="blue" />);
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).toContain('rounded-xl');
    });

    it('has flex centering', () => {
      const { container } = render(<IconContainer color="blue" />);
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).toContain('flex');
      expect(iconContainer.className).toContain('items-center');
      expect(iconContainer.className).toContain('justify-center');
    });

    it('has transition classes', () => {
      const { container } = render(<IconContainer color="blue" />);
      const iconContainer = container.firstChild as HTMLElement;
      expect(iconContainer.className).toContain('transition-transform');
    });
  });
});
