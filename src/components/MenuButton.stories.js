import React from 'react';
import MenuButton from './MenuButton';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'MenuButton component',
  component: MenuButton,
};

export function DefaultStyle() {
  return <MenuButton />;
}

export function FocusStyle() {
  return <MenuButton />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <MenuButton />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <MenuButton />;
}
ActiveStyle.parameters = {pseudo: {active: true}};
