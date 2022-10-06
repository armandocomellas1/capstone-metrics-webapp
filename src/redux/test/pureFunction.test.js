/**
 * @jest-environment jsdom
 */
import loadingStatus from '../loadStats';
import App from '../../App';

 // const getOBject = Details();
 const validateInput = loadingStatus.succeeded;
 const resultDetails = App();
 const getAppCheck = resultDetails.props.children[1].props.children[0].props.element.props.name;

 describe('Object stats check test and Details check test', () => {
   test('Expect input should TEXT', () => {
     expect(validateInput).toBe('SUCCEEDED');
   });

   test('Expect the main page render europe countires', () => {
    expect(getAppCheck).toBe('Europe');
  });
 });
