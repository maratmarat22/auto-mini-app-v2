import { Headline, Subheadline } from '@telegram-apps/telegram-ui';
import { type LucideProps } from 'lucide-react';

import styles from './StepHeader.module.css';

import type React from 'react';

interface StepHeaderProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  iconClassName?: string;
  headline: string;
  children: React.ReactNode;
}

export const StepHeader = ({
  icon: Icon,
  iconClassName = '',
  headline,
  children,
}: StepHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={`${styles.icon} ${iconClassName}`}>
        <Icon size={32} />
      </div>
      <Headline weight="1">{headline}</Headline>
      <Subheadline className={styles.subheadline}>{children}</Subheadline>
    </div>
  );
};
