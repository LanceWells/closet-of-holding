import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { TabPanel } from './tabpanel';

export default {
  component: TabPanel,
} as ComponentMeta<typeof TabPanel>;

const Template: ComponentStory<typeof TabPanel> = (args) => (
  <TabPanel {...args}/>
);

export const Basic = Template.bind({});
Basic.args = {};
