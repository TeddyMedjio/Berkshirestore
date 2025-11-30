import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props) => {
  return (
    <div className="mx-auto container max-w-[1200px] px-5 lg:px-0">
      {children}
    </div>
  );
};
