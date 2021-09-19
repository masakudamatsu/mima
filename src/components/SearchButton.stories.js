import React from 'react';
import SearchButton from './SearchButton';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'SearchButton component',
  component: SearchButton,
};

export function DefaultStyle() {
  return <SearchButton />;
}

export function FocusStyle() {
  return <SearchButton />;
}
FocusStyle.parameters = {pseudo: {focus: true}};

export function HoverStyle() {
  return <SearchButton />;
}
HoverStyle.parameters = {pseudo: {hover: true}};

export function ActiveStyle() {
  return <SearchButton />;
}
ActiveStyle.parameters = {pseudo: {active: true}};
