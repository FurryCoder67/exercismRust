type Point = {
  x: number
  y: number
  angle: number
}

type Prism = {
  id: number
  x: number
  y: number
  angle: number
}

export function findSequence(start: unknown, prisms: unknown): unknown {
  const s = start as Point
  const ps = prisms as Prism[]

  let x = s.x
  let y = s.y
  let angle = s.angle

  const result: number[] = []

  // Coordinates/angles are rounded in the test data.
  const TOLERANCE = 0.15

  while (true) {
    const radians = angle * Math.PI / 180

    // Unit vector pointing in the laser's direction
    const dx = Math.cos(radians)
    const dy = Math.sin(radians)

    let closest: Prism | null = null
    let closestDistance = Infinity

    for (const prism of ps) {
      const vx = prism.x - x
      const vy = prism.y - y

      // Distance along the laser's direction.
      // Negative means the prism is behind us.
      const forwardDistance = vx * dx + vy * dy

      if (forwardDistance <= TOLERANCE) {
        continue
      }

      // Perpendicular distance from the prism to the laser's line.
      // Since (dx, dy) is a unit vector, this is the actual distance.
      const perpendicularDistance = Math.abs(
        vx * dy - vy * dx
      )

      if (perpendicularDistance > TOLERANCE) {
        continue
      }

      // Choose the closest prism in front of the laser.
      if (forwardDistance < closestDistance) {
        closestDistance = forwardDistance
        closest = prism
      }
    }

    if (closest === null) {
      break
    }

    result.push(closest.id)

    // Move the laser to the prism.
    x = closest.x
    y = closest.y

    // The prism changes the current direction.
    angle += closest.angle

    // Normalize angle.
    angle = ((angle % 360) + 360) % 360
  }

  return result
}