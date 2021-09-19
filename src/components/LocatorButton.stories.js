import React from 'react';
import LocatorButton from './LocatorButton';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'LocatorButton component',
  component: LocatorButton,
};

export function DefaultStyle() {
  return <LocatorButton />;
}

export function FocusStyle() {
  return <LocatorButton />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <LocatorButton />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <LocatorButton />;
}
ActiveStyle.parameters = {pseudo: {active: true}};
