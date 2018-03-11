const  arrayTreeFilter = (data, filterFn, options)=> {
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'children';
  let children = data || [];
  let result = [];
  let level = 0;
  let foundItem;
  do {
    let foundItem = children.filter((item)=> {
      return filterFn(item, level);
    })[0];
    if (!foundItem) {
      break;
    }
    result.push(foundItem);
    children = foundItem[options.childrenKeyName] || [];
    level += 1;
  } while(children.length > 0);
  return result;
}

export default arrayTreeFilter
