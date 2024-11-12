class smoothCorners {
  static get inputProperties() {
    return ['--smooth-corners', '--smooth-corners-percent']
  }

  paint(ctx, geom, properties) {
    const radius = properties.get('--smooth-corners').toString()
    let percent = properties
      .get('--smooth-corners-percent')
      .toString()
      ?.split(' ')?.[0]
    percent = parseInt(percent) || 0

    ctx.fillStyle = 'black'

    const size = { width: geom.width, height: geom.height }

    const maxRadius = Math.min(geom.width / 2.0, geom.height / 2.0)

    const percentRadius = (percent / 100.0) * maxRadius

    let r = radius ? radius : percentRadius // 优先取数值

    r = Math.min(r, maxRadius)

    // 是否启用对应角的圆角
    let tl, tr, bl, br
    tl = tr = bl = br = true

    // 开始绘制逻辑

    let posX = 0
    let posY = 0

    //两端终点
    let ratio
    if (r / Math.min(size.width / 2, size.height / 2) > 0.5) {
      let percentage =
        (r / Math.min(size.width / 2, size.height / 2) - 0.5) / 0.4
      let clampedPer = Math.min(1, percentage)
      ratio = 1 - (1 - 1.104 / 1.2819) * clampedPer
    } else {
      ratio = 1
    }
    //两端终点的操控点
    let controlratio
    if (r / Math.min(size.width / 2, size.height / 2) > 0.6) {
      let percentage =
        (r / Math.min(size.width / 2, size.height / 2) - 0.6) / 0.3
      let clampedPer = Math.min(1, percentage)
      controlratio = 1 + (0.8717 / 0.8362 - 1) * clampedPer
    } else {
      controlratio = 1
    }

    ctx.beginPath()

    ctx.moveTo(posX + size.width / 2, posY)
    if (!tr) {
      ctx.lineTo(posX + size.width, posY)
    } else {
      ctx.lineTo(
        posX +
          Math.max(size.width / 2, size.width - (r / 100) * 128.19 * ratio),
        posY,
      )
      ctx.bezierCurveTo(
        posX + size.width - (r / 100) * 83.62 * controlratio,
        posY,
        posX + size.width - (r / 100) * 67.45,
        posY + (r / 100) * 4.64,
        posX + size.width - (r / 100) * 51.16,
        posY + (r / 100) * 13.36,
      )
      ctx.bezierCurveTo(
        posX + size.width - (r / 100) * 34.86,
        posY + (r / 100) * 22.07,
        posX + size.width - (r / 100) * 22.07,
        posY + (r / 100) * 34.86,
        posX + size.width - (r / 100) * 13.36,
        posY + (r / 100) * 51.16,
      )
      ctx.bezierCurveTo(
        posX + size.width - (r / 100) * 4.64,
        posY + (r / 100) * 67.45,
        posX + size.width,
        posY + (r / 100) * 83.62 * controlratio,
        posX + size.width,
        posY + Math.min(size.height / 2, (r / 100) * 128.19 * ratio),
      )
    }

    if (!br) {
      ctx.lineTo(posX + size.width, posY + size.height)
    } else {
      ctx.lineTo(
        posX + size.width,
        posY +
          Math.max(size.height / 2, size.height - (r / 100) * 128.19 * ratio),
      )
      ctx.bezierCurveTo(
        posX + size.width,
        posY + size.height - (r / 100) * 83.62 * controlratio,
        posX + size.width - (r / 100) * 4.64,
        posY + size.height - (r / 100) * 67.45,
        posX + size.width - (r / 100) * 13.36,
        posY + size.height - (r / 100) * 51.16,
      )
      ctx.bezierCurveTo(
        posX + size.width - (r / 100) * 22.07,
        posY + size.height - (r / 100) * 34.86,
        posX + size.width - (r / 100) * 34.86,
        posY + size.height - (r / 100) * 22.07,
        posX + size.width - (r / 100) * 51.16,
        posY + size.height - (r / 100) * 13.36,
      )
      ctx.bezierCurveTo(
        posX + size.width - (r / 100) * 67.45,
        posY + size.height - (r / 100) * 4.64,
        posX + size.width - (r / 100) * 83.62 * controlratio,
        posY + size.height,
        posX +
          Math.max(size.width / 2, size.width - (r / 100) * 128.19 * ratio),
        posY + size.height,
      )
    }

    if (!bl) {
      ctx.lineTo(posX, posY + size.height)
    } else {
      ctx.lineTo(
        posX + Math.min(size.width / 2, (r / 100) * 128.19 * ratio),
        posY + size.height,
      )
      ctx.bezierCurveTo(
        posX + (r / 100) * 83.62 * controlratio,
        posY + size.height,
        posX + (r / 100) * 67.45,
        posY + size.height - (r / 100) * 4.64,
        posX + (r / 100) * 51.16,
        posY + size.height - (r / 100) * 13.36,
      )
      ctx.bezierCurveTo(
        posX + (r / 100) * 34.86,
        posY + size.height - (r / 100) * 22.07,
        posX + (r / 100) * 22.07,
        posY + size.height - (r / 100) * 34.86,
        posX + (r / 100) * 13.36,
        posY + size.height - (r / 100) * 51.16,
      )
      ctx.bezierCurveTo(
        posX + (r / 100) * 4.64,
        posY + size.height - (r / 100) * 67.45,
        posX,
        posY + size.height - (r / 100) * 83.62 * controlratio,
        posX,
        posY +
          Math.max(size.height / 2, size.height - (r / 100) * 128.19 * ratio),
      )
    }

    if (!tl) {
      ctx.lineTo(posX, posY)
    } else {
      ctx.lineTo(
        posX,
        posY + Math.min(size.height / 2, (r / 100) * 128.19 * ratio),
      )
      ctx.bezierCurveTo(
        posX,
        posY + (r / 100) * 83.62 * controlratio,
        posX + (r / 100) * 4.64,
        posY + (r / 100) * 67.45,
        posX + (r / 100) * 13.36,
        posY + (r / 100) * 51.16,
      )
      ctx.bezierCurveTo(
        posX + (r / 100) * 22.07,
        posY + (r / 100) * 34.86,
        posX + (r / 100) * 34.86,
        posY + (r / 100) * 22.07,
        posX + (r / 100) * 51.16,
        posY + (r / 100) * 13.36,
      )
      ctx.bezierCurveTo(
        posX + (r / 100) * 67.45,
        posY + (r / 100) * 4.64,
        posX + (r / 100) * 83.62 * controlratio,
        posY,
        posX + Math.min(size.width / 2, (r / 100) * 128.19 * ratio),
        posY,
      )
    }

    ctx.closePath()
    ctx.fill()
  }
}

// eslint-disable-next-line no-undef
registerPaint('smooth-corners', smoothCorners)
