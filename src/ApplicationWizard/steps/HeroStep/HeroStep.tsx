import { Text, Placeholder } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';

import carGif from '@/assets/hero-car.gif';

import styles from './HeroStep.module.css';

export const HeroStep = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        {/* Иконка или иллюстрация */}
        <Placeholder
          description="Подберем идеальный автомобиль под ваш бюджет за 3 шага"
          header="Найди авто своей мечты"
        >
          <img
            alt="Telegram sticker"
            src={carGif} // Тут можно вставить стикер или иконку авто
            style={{ width: 256, height: 256 }}
          />
        </Placeholder>

        {/* Список преимуществ */}
        <div className={styles.features}>
          <motion.div
            className={styles.featureItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className={styles.icon}>⚡️</span>
            <Text>Быстрый поиск по 50+ дилерам</Text>
          </motion.div>

          <motion.div
            className={styles.featureItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className={styles.icon}>🛡️</span>
            <Text>Только проверенные объявления</Text>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
