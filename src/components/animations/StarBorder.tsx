
import "./StarBorder.css";
import { ElementType, ComponentPropsWithoutRef } from 'react';

interface StarBorderProps<T extends ElementType = 'button'> {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  children: React.ReactNode;
}

type Props<T extends ElementType> = StarBorderProps<T> & 
  Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps>;

const StarBorder = <T extends ElementType = 'button'>({
  as,
  className = "",
  color = "white",
  speed = "6s",
  children,
  ...rest
}: Props<T>) => {
  const Component = as || 'button';
  
  return (
    <Component className={`star-border-container ${className}`} {...rest}>
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
