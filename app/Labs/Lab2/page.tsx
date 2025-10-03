import './ForegroundColors';
import './index.css';
import BackgroundColors from '@/app/Labs/Lab2/BackgroundColors';
import BootstrapForms from '@/app/Labs/Lab2/BootstrapForms';
import BootstrapGrids from '@/app/Labs/Lab2/BootstrapGrids';
import BootstrapLists from '@/app/Labs/Lab2/BootstrapLists';
import BootstrapNavigation from '@/app/Labs/Lab2/BootstrapNavigation';
import BootstrapTables from '@/app/Labs/Lab2/BootstrapTables';
import Borders from '@/app/Labs/Lab2/Borders';
import Dimensions from '@/app/Labs/Lab2/Dimensions';
import Flex from '@/app/Labs/Lab2/Flex';
import Float from '@/app/Labs/Lab2/Float';
import ForegroundColors from '@/app/Labs/Lab2/ForegroundColors';
import GridLayout from '@/app/Labs/Lab2/GridLayout';
import Margin from '@/app/Labs/Lab2/Margin';
import Padding from '@/app/Labs/Lab2/Padding';
import Positions from '@/app/Labs/Lab2/Positions';
import ReactIconsSampler from '@/app/Labs/Lab2/ReactIcons';
import ScreenSizeLabel from '@/app/Labs/Lab2/ScreenSizeLabel';
import ZIndex from '@/app/Labs/Lab2/ZIndex';
import { Container } from 'react-bootstrap';

export default function Lab2() {
  return (
    <Container>
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p>
        Style attribute allows configuring look and feel right on the element.
        Although it&quot;s very convenient it is considered bad practice and you
        should avoid using the style attribute
      </p>
      <div id='wd-css-id-selectors'>
        <h3>ID selectors</h3>
        <p id='wd-id-selector-1'>
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id='wd-id-selector-2'>
          Here&quot;s another paragraph using a different ID and a different
          look and feel
        </p>
      </div>
      <div id='wd-css-class-selectors'>
        <h3>Class selectors</h3>
        <p className='wd-class-selector'>
          Instead of using IDs to refer to elements, you can use an
          element&quot;s CLASS attribute
        </p>
        <h4 className='wd-class-selector'>
          This heading has same style as paragraph above
        </h4>
      </div>
      <div id='wd-css-document-structure'>
        <div className='wd-selector-1'>
          <h3>Document structure selectors</h3>
          <div className='wd-selector-2'>
            Selectors can be combined to refer elements in particular places in
            the document
            <p className='wd-selector-3'>
              This paragraph&quot;s red background is referenced as
              <br />
              .selector-2 .selector3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className='wd-selector-4'>
                Whereas this span is a direct child of its parent
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure
            </p>
          </div>
        </div>
      </div>
      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <Margin />
      <Dimensions />
      <Positions />
      <ZIndex />
      <Float />
      <GridLayout />
      <Flex />
      <ReactIconsSampler />
      <BootstrapGrids />
      <ScreenSizeLabel />
      <BootstrapTables />
      <BootstrapLists />
      <BootstrapForms />
      <BootstrapNavigation />
    </Container>
  );
}
