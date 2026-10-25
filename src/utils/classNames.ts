interface CreateStylesProps {
  styles: Record<string, string>;
}
export const createStyles = <T extends Record<string, string>>(styles: T) => {
  return (className: keyof T): string => styles[className] || '';
};
