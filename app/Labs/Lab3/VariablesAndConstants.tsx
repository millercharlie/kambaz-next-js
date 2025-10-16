export default function VariablesAndConstants() {
  let functionScoped = 2; // var was causing the deployment to fail
  let blockScoped = 5;
  blockScoped = 6;
  const constant1 = functionScoped - blockScoped;
  return (
    <div id='wd-variables-and-constants'>
      <h4>Variables and Constants</h4>
      functionScoped = {functionScoped}
      <br />
      blockScoped = {blockScoped}
      <br />
      constant1 = {constant1}
      <hr />
    </div>
  );
}
