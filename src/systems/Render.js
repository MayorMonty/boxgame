import { EntitySystem } from "./EntitySystem";

const Render = new EntitySystem(({ entity, context }) => {
  context.fillStyle = entity.render.fillStyle || "black";

  entity.render = { box: true, text: false, ...entity.render };

  if (entity.render.box) {
    context.fillRect(
      entity.position.x,
      entity.position.y,
      entity.size.width,
      entity.size.height
    );
  }

  if (entity.render.text) {
    context.font = entity.text.font || "18px serif";
    context.textBaseline = entity.text.baseline || "middle";
    context.fillStyle = entity.text.color || "white";

    let text =
        typeof entity.text.content === "function"
          ? entity.text.content()
          : entity.text.content,
      textDetails = context.measureText(text);

    let x = entity.position.x + entity.size.width / 2 - textDetails.width / 2,
      y = entity.position.y + entity.size.height / 2;

    context.fillText(text, x, y);
  }
});

export default Render;
