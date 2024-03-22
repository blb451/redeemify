import { render } from '@testing-library/react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import LayoutHeader from '@/components/LayoutHeader';

describe('LayoutHeader component', () => {
  const currentUser = {
    id: '1',
    name: 'TestUser',
    points: 100,
  };

  it(`renders snapshot correctly`, () => {
    const tree = renderer
      .create(<LayoutHeader currentUser={currentUser} title="Test Title" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly', () => {
    const { getByText } = render(
      <LayoutHeader currentUser={currentUser} title="Test Title" />
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Available Points:')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
  });

  test('does not render title if not provided', () => {
    const { queryByText } = render(<LayoutHeader currentUser={currentUser} />);
    expect(queryByText('Test Title')).toBeNull();
  });
});
