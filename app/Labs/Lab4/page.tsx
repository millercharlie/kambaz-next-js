'use client';

import store from '../store';
import ArrayStateVariable from '@/app/Labs/Lab4/ArrayStateVariable';
import BooleanStateVariables from '@/app/Labs/Lab4/BooleanStateVariables';
import ClickEvent from '@/app/Labs/Lab4/ClickEvent';
import Counter from '@/app/Labs/Lab4/Counter';
import DateStateVariable from '@/app/Labs/Lab4/DateStateVariable';
import EventObject from '@/app/Labs/Lab4/EventObject';
import ObjectStateVariable from '@/app/Labs/Lab4/ObjectStateVariable';
import ParentStateComponent from '@/app/Labs/Lab4/ParentStateComponent';
import PassingDataOnEvent from '@/app/Labs/Lab4/PassingDataOnEvent';
import PassingFunctions from '@/app/Labs/Lab4/PassingFunctions';
import ReduxExamples from '@/app/Labs/Lab4/ReduxExamples/page';
import StringStateVariables from '@/app/Labs/Lab4/StringStateVariables';

const Lab4 = () => {
  function sayHello() {
    alert('Hello');
  }

  return (
    <div id='wd-lab4'>
      <h2>Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <ReduxExamples />
    </div>
  );
};

export default Lab4;
