// У вас є компонент React, який використовує useRef та IntersectionObserver для визначення, коли користувач переглядає кінець вмісту. Ваше завдання полягає в наступному:
// Встановіть правильні типи пропсів для цього компонента. У ньому є дві властивості: children і onContentEndVisible. children - це будь-який валідний React вузол, а onContentEndVisible - це функція без аргументів, що повертає void.
// Встановіть правильний тип useRef. Посилання endContentRef використовується для div, який міститься в кінці вмісту.
// Встановіть правильний тип для options (клас також може бути типом для options).

import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  onContentEndVisible: () => void;
};

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
