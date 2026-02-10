function buildArraySetOperation(namespace, body, allowedFields) {
  const setOperation = {};

  allowedFields.forEach((field) => {
    if (body[field]) {
      setOperation[`${namespace}.$.${field}`] = body[field];
    }
  });

  return setOperation;
}

module.exports = buildArraySetOperation;
