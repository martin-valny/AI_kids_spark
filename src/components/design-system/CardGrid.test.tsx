import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardGrid } from './CardGrid';

describe('CardGrid', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(
        <CardGrid>
          <div>Child 1</div>
          <div>Child 2</div>
        </CardGrid>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('wraps each child in a listitem', () => {
      render(
        <CardGrid>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </CardGrid>
      );
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
    });
  });

  describe('column configurations', () => {
    it('defaults to 3 columns', () => {
      const { container } = render(
        <CardGrid>
          <div>Child</div>
        </CardGrid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain('lg:grid-cols-3');
    });

    it('applies 2 column grid classes', () => {
      const { container } = render(
        <CardGrid columns={2}>
          <div>Child</div>
        </CardGrid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain('md:grid-cols-2');
    });

    it('applies 3 column grid classes', () => {
      const { container } = render(
        <CardGrid columns={3}>
          <div>Child</div>
        </CardGrid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain('lg:grid-cols-3');
    });

    it('applies 4 column grid classes', () => {
      const { container } = render(
        <CardGrid columns={4}>
          <div>Child</div>
        </CardGrid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain('md:grid-cols-4');
    });
  });

  describe('accessibility', () => {
    it('has role="list"', () => {
      render(
        <CardGrid>
          <div>Child</div>
        </CardGrid>
      );
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('has default aria-label based on columns', () => {
      render(
        <CardGrid columns={3}>
          <div>Child</div>
        </CardGrid>
      );
      expect(screen.getByRole('list')).toHaveAttribute(
        'aria-label',
        'Grid with 3 columns'
      );
    });

    it('uses custom aria-label when provided', () => {
      render(
        <CardGrid aria-label="Feature cards">
          <div>Child</div>
        </CardGrid>
      );
      expect(screen.getByRole('list')).toHaveAttribute(
        'aria-label',
        'Feature cards'
      );
    });

    it('children have role="listitem"', () => {
      render(
        <CardGrid>
          <div>Child 1</div>
          <div>Child 2</div>
        </CardGrid>
      );
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(2);
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to the div element', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <CardGrid ref={ref}>
          <div>Child</div>
        </CardGrid>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom className', () => {
    it('merges custom className with default classes', () => {
      const { container } = render(
        <CardGrid className="custom-class">
          <div>Child</div>
        </CardGrid>
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.className).toContain('custom-class');
      expect(grid.className).toContain('grid'); // Still has grid class
    });
  });

  describe('edge cases', () => {
    it('handles empty children gracefully', () => {
      const { container } = render(<CardGrid>{null}</CardGrid>);
      const grid = container.firstChild as HTMLElement;
      expect(grid).toBeInTheDocument();
    });

    it('handles mixed valid and invalid children', () => {
      render(
        <CardGrid>
          <div>Valid child</div>
          {null}
          {undefined}
          <div>Another valid child</div>
        </CardGrid>
      );
      expect(screen.getByText('Valid child')).toBeInTheDocument();
      expect(screen.getByText('Another valid child')).toBeInTheDocument();
    });
  });
});
