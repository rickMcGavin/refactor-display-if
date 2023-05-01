module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  function replaceDisplayIf(path) {
    const displayIfAttr = path.node.openingElement.attributes.find(
      (attr) => attr?.name?.name === "display-if"
    );

    if (!displayIfAttr) {
      return;
    }

    // Store the value of the `display-if` property
    const condition = displayIfAttr.value.expression;

    // Remove the display-if prop from the attributes
    path.node.openingElement.attributes =
      path.node.openingElement.attributes.filter(
        (attr) => attr?.name?.name !== "display-if"
      );

    const isImplicitReturn =
      path.parentPath.node.type === "ArrowFunctionExpression";

    const isReturnStatement = path.parentPath.node.type === "ReturnStatement";

    if (isImplicitReturn) {
      // If it's inside an implicit return, do not wrap the short-circuit operator with curly braces
      path.parentPath.replace(
        j.arrowFunctionExpression(
          path.parentPath.node.params,
          j.logicalExpression("&&", condition, path.node),
          true
        )
      );
    } else if (isReturnStatement) {
      // If it's inside a return statement, do not wrap the short-circuit operator with curly braces
      path.replace(j.logicalExpression("&&", condition, path.node));
    } else {
      // Everything else, wrap the short-circuit operator with curly braces
      path.replace(
        j.jsxExpressionContainer(
          j.logicalExpression("&&", condition, path.node)
        )
      );
    }
  }

  root.find(j.JSXElement).forEach(replaceDisplayIf);

  return root.toSource();
};
