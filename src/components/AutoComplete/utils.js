export function getValuePropValue(child) {
  const props = child.props;
  if ('value' in props) {
    return props.value;
  }
  if (child.key) {
    return child.key;
  }
  throw new Error(
    `Need at least a key or a value or a label for ${child}`
  );
}
