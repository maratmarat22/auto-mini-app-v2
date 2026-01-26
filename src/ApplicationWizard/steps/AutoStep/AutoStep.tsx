import { useQuery } from '@tanstack/react-query';
import { Cell, List, Spinner } from '@telegram-apps/telegram-ui';

import { autoApi } from '@/ApplicationWizard/api/getAutoInfo';

export const AutoStep = () => {
  const { data: brands, isLoading: brandsAreLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: autoApi.getBrands,
  });

  if (brandsAreLoading) return <Spinner size="m" />;

  console.log(brands);

  return (
    <List>
      {brands?.map((b) => (
        <Cell key={b.id}>{b.name}</Cell>
      ))}
    </List>
  );
};
