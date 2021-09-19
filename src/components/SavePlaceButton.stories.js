import React from 'react';
import SavePlaceButton from './SavePlaceButton';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'SavePlaceButton component',
  component: SavePlaceButton,
};

export function DefaultStyle() {
  return <SavePlaceButton />;
}

export function FocusStyle() {
  return <SavePlaceButton />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <SavePlaceButton />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <SavePlaceButton />;
}
ActiveStyle.parameters = {pseudo: {active: true}};
