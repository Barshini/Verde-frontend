import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          if (entry.target.classList.contains('reveal-stagger')) {
            const children = Array.from(entry.target.children);
            children.forEach((child, index) => {
              if (child.classList.contains('reveal')) {
                (child as HTMLElement).style.transitionDelay = `${index * 150}ms`;
                child.classList.add('visible');
              }
            });
          }
        }
      });
    }, {
      root: null,
      rootMargin: '60px',
      threshold: 0.05,
    });

    const observeNewElements = () => {
      const elements = document.querySelectorAll('.reveal:not(.visible), .reveal-stagger:not(.visible)');
      elements.forEach(el => intersectionObserver.observe(el));
    };

    observeNewElements();

    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
};
