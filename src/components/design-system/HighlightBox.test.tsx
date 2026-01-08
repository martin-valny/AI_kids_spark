import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HighlightBox } from './HighlightBox';
import { Star } from 'lucide-react';

describe('HighlightBox', () => {
  describe('rendering', () => {
    it('renders with required variant and children', () => {
      render(<HighlightBox variant="info">Test content</HighlightBox>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <HighlightBox variant="info">
          <strong>Bold text</strong> and normal text
        </HighlightBox>
      );
      expect(screen.getByText('Bold text')).toBeInTheDocument();
      expect(screen.getByText(/and normal text/)).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('applies info variant classes (blue border)', () => {
      const { container } = render(
        <HighlightBox variant="info">Info content</HighlightBox>
      );
      const box = container.firstChild as HTMLElement;
      expect(box.className).toContain('border-kids-blue');
      expect(box.className).toContain('bg-white/80');
    });

    it('applies warning variant classes (yellow border)', () => {
      const { container } = render(
        <HighlightBox variant="warning">Warning content</HighlightBox>
      );
      const box = container.firstChild as HTMLElement;
      expect(box.className).toContain('border-kids-yellow');
      expect(box.className).toContain('bg-white/80');
    });

    it('applies success variant classes (green border)', () => {
      const { container } = render(
        <HighlightBox variant="success">Success content</HighlightBox>
      );
      const box = container.firstChild as HTMLElement;
      expect(box.className).toContain('border-kids-green');
      expect(box.className).toContain('bg-white/80');
    });

    it('applies tip variant classes (purple border)', () => {
      const { container } = render(
        <HighlightBox variant="tip">Tip content</HighlightBox>
      );
      const box = container.firstChild as HTMLElement;
      expect(box.className).toContain('border-kids-purple');
      expect(box.className).toContain('bg-white/80');
    });
  });

  describe('icons', () => {
    it('shows default icon by default', () => {
      render(<HighlightBox variant="info">Content</HighlightBox>);
      // Default icons are rendered - we check for aria-hidden icon container
      const iconSpan = document.querySelector('[aria-hidden="true"]');
      expect(iconSpan).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      render(
        <HighlightBox variant="info" showIcon={false}>
          Content
        </HighlightBox>
      );
      const iconSpan = document.querySelector('[aria-hidden="true"]');
      expect(iconSpan).not.toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      render(
        <HighlightBox variant="info" icon={<Star data-testid="custom-icon" />}>
          Content
        </HighlightBox>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has role="note"', () => {
      render(<HighlightBox variant="info">Content</HighlightBox>);
      expect(screen.getByRole('note')).toBeInTheDocument();
    });

    it('uses default aria-label based on variant', () => {
      render(<HighlightBox variant="info">Content</HighlightBox>);
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Information');
    });

    it('uses warning aria-label for warning variant', () => {
      render(<HighlightBox variant="warning">Content</HighlightBox>);
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Warning');
    });

    it('uses success aria-label for success variant', () => {
      render(<HighlightBox variant="success">Content</HighlightBox>);
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Success');
    });

    it('uses tip aria-label for tip variant', () => {
      render(<HighlightBox variant="tip">Content</HighlightBox>);
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Tip');
    });

    it('uses custom aria-label when provided', () => {
      render(
        <HighlightBox variant="info" aria-label="Custom label">
          Content
        </HighlightBox>
      );
      expect(screen.getByRole('note')).toHaveAttribute('aria-label', 'Custom label');
    });

    it('icon container is hidden from screen readers', () => {
      render(<HighlightBox variant="info">Content</HighlightBox>);
      const iconSpan = document.querySelector('[aria-hidden="true"]');
      expect(iconSpan).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the div element', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <HighlightBox variant="info" ref={ref}>
          Content
        </HighlightBox>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom className', () => {
    it('merges custom className with default classes', () => {
      const { container } = render(
        <HighlightBox variant="info" className="custom-class">
          Content
        </HighlightBox>
      );
      const box = container.firstChild as HTMLElement;
      expect(box.className).toContain('custom-class');
    });
  });
});
