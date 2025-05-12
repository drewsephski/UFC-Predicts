import React from 'react';

/**
 * A utility component that fixes SVG DOM property warnings by converting
 * kebab-case attributes to camelCase as required by React.
 * 
 * @param props - The SVG element props
 * @returns A React SVG element with properly formatted attributes
 */
export const SVG = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    // Convert kebab-case attributes to camelCase
    const fixedProps = Object.entries(props).reduce((acc, [key, value]) => {
      // Convert common SVG attributes that cause warnings
      const fixedKey = key
        .replace('stroke-width', 'strokeWidth')
        .replace('stroke-linecap', 'strokeLinecap')
        .replace('stroke-linejoin', 'strokeLinejoin')
        .replace('fill-rule', 'fillRule')
        .replace('clip-path', 'clipPath')
        .replace('fill-opacity', 'fillOpacity')
        .replace('color-interpolation-filters', 'colorInterpolationFilters')
        .replace('stop-color', 'stopColor')
        .replace('stop-opacity', 'stopOpacity')
        .replace('shape-rendering', 'shapeRendering');
      
      return { ...acc, [fixedKey]: value };
    }, {});

    return <svg ref={ref} {...fixedProps} />;
  }
);

SVG.displayName = 'SVG';

/**
 * A utility component that fixes path DOM property warnings by converting
 * kebab-case attributes to camelCase as required by React.
 */
export const Path = React.forwardRef<SVGPathElement, React.SVGProps<SVGPathElement>>(
  (props, ref) => {
    // Convert kebab-case attributes to camelCase
    const fixedProps = Object.entries(props).reduce((acc, [key, value]) => {
      // Convert common path attributes that cause warnings
      const fixedKey = key
        .replace('stroke-width', 'strokeWidth')
        .replace('stroke-linecap', 'strokeLinecap')
        .replace('stroke-linejoin', 'strokeLinejoin')
        .replace('fill-rule', 'fillRule')
        .replace('fill-opacity', 'fillOpacity');
      
      return { ...acc, [fixedKey]: value };
    }, {});

    return <path ref={ref} {...fixedProps} />;
  }
);

Path.displayName = 'Path';

/**
 * A utility component that fixes circle DOM property warnings by converting
 * kebab-case attributes to camelCase as required by React.
 */
export const Circle = React.forwardRef<SVGCircleElement, React.SVGProps<SVGCircleElement>>(
  (props, ref) => {
    // Convert kebab-case attributes to camelCase
    const fixedProps = Object.entries(props).reduce((acc, [key, value]) => {
      // Convert common circle attributes that cause warnings
      const fixedKey = key
        .replace('stroke-width', 'strokeWidth')
        .replace('fill-opacity', 'fillOpacity')
        .replace('shape-rendering', 'shapeRendering');
      
      return { ...acc, [fixedKey]: value };
    }, {});

    return <circle ref={ref} {...fixedProps} />;
  }
);

Circle.displayName = 'Circle';

/**
 * A utility component that fixes filter DOM property warnings by converting
 * kebab-case attributes to camelCase as required by React.
 */
export const Filter = React.forwardRef<SVGFilterElement, React.SVGProps<SVGFilterElement>>(
  (props, ref) => {
    // Convert kebab-case attributes to camelCase
    const fixedProps = Object.entries(props).reduce((acc, [key, value]) => {
      // Convert common filter attributes that cause warnings
      const fixedKey = key
        .replace('color-interpolation-filters', 'colorInterpolationFilters');
      
      return { ...acc, [fixedKey]: value };
    }, {});

    return <filter ref={ref} {...fixedProps} />;
  }
);

Filter.displayName = 'Filter';

/**
 * A utility component that fixes stop DOM property warnings by converting
 * kebab-case attributes to camelCase as required by React.
 */
export const Stop = React.forwardRef<SVGStopElement, React.SVGProps<SVGStopElement>>(
  (props, ref) => {
    // Convert kebab-case attributes to camelCase
    const fixedProps = Object.entries(props).reduce((acc, [key, value]) => {
      // Convert common stop attributes that cause warnings
      const fixedKey = key
        .replace('stop-color', 'stopColor')
        .replace('stop-opacity', 'stopOpacity');
      
      return { ...acc, [fixedKey]: value };
    }, {});

    return <stop ref={ref} {...fixedProps} />;
  }
);

Stop.displayName = 'Stop';
