import Add from '@/app/Labs/Lab3/Add';
import AddingAndRemovingToFromArrays from '@/app/Labs/Lab3/AddingAndRemovingToFromArrays';
import ArrayIndexAndLength from '@/app/Labs/Lab3/ArrayIndexAndLength';
import ArrowFunctions from '@/app/Labs/Lab3/ArrowFunctions';
import BooleanVariables from '@/app/Labs/Lab3/BooleanVariables';
import Classes from '@/app/Labs/Lab3/Classes';
import ConditionalOutputIfElse from '@/app/Labs/Lab3/ConditionalOutputIfElse';
import ConditionalOutputInline from '@/app/Labs/Lab3/ConditionalOutputInline';
import Destructing from '@/app/Labs/Lab3/Destructing';
import DestructingImports from '@/app/Labs/Lab3/DestructingImports';
import FilterFunction from '@/app/Labs/Lab3/FilterFunction';
import FindFunction from '@/app/Labs/Lab3/FindFunction';
import FindIndexFunction from '@/app/Labs/Lab3/FindIndex';
import ForLoops from '@/app/Labs/Lab3/ForLoops';
import FunctionDestructing from '@/app/Labs/Lab3/FunctionDestructing';
import Highlight from '@/app/Labs/Lab3/Highlight';
import House from '@/app/Labs/Lab3/House';
import IfElse from '@/app/Labs/Lab3/IfElse';
import ImpliedReturn from '@/app/Labs/Lab3/ImpliedReturn';
import JsonStringify from '@/app/Labs/Lab3/JsonStringify';
import LegacyFunctions from '@/app/Labs/Lab3/LegacyFunctions';
import MapFunction from '@/app/Labs/Lab3/MapFunction';
import PathParameters from '@/app/Labs/Lab3/PathParameters';
import SimpleArrays from '@/app/Labs/Lab3/SimpleArrays';
import Spreading from '@/app/Labs/Lab3/Spreader';
import Square from '@/app/Labs/Lab3/Square';
import Styles from '@/app/Labs/Lab3/Styles';
import TemplateLiterals from '@/app/Labs/Lab3/TemplateLiterals';
import TernaryOperator from '@/app/Labs/Lab3/TernaryOperator';
import VariableTypes from '@/app/Labs/Lab3/VariableTypes';
import VariablesAndConstants from '@/app/Labs/Lab3/VariablesAndConstants';
import TodoList from '@/app/Labs/Lab3/todos/TodoList';

export default function Lab3() {
  console.log('Hello World!');
  return (
    <div id='wd-lab3'>
      <h2>Lab 3</h2>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndexFunction />
      <FilterFunction />
      <JsonStringify />
      <House />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione
        eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo
        excepturi consectetur. Modi omnis minus sequi maiores, provident
        voluptates.
      </Highlight>
      <hr />
      <PathParameters />
      <hr />
      <TodoList />
    </div>
  );
}
