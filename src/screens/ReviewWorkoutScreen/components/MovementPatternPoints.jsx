import { Flex, Spacer, Text } from 'native-base';
import { Fragment } from 'react';

import { MOVEMENT_PATTERNS } from '~/constants';

export const MovementPatternPoints = ({ activeWorkout, options }) => {
  const { primaryFocus = '', secondaryFocus = '' } = options;

  const movementPatternPoints = activeWorkout.reduce((points, variation) => {
    for (const movementPattern of MOVEMENT_PATTERNS) {
      if (!Object.keys(points).includes(movementPattern)) {
        points[movementPattern] = 0;
      }

      if (variation.movementPatterns.includes(movementPattern)) {
        points[movementPattern] += 1;
      }
    }
    return points;
  }, {});

  return (
    <Flex id="Movement Pattern Points" alignItems="center" my={1} mb={2}>
      <Text fontWeight="medium" fontSize="md" mb={1}>
        Movement Patterns
      </Text>
      <Flex direction="row" alignItems="center">
        <Spacer />
        {Object.entries(movementPatternPoints).map(
          ([movementPattern, points]) => {
            let color;
            if (movementPattern === primaryFocus) color = 'primary.700';
            if (movementPattern === secondaryFocus) color = 'secondary.700';
            return (
              points > 0 && (
                <Fragment key={movementPattern}>
                  <Text fontSize="sm" fontWeight="medium" color={color}>
                    {movementPattern}: {points}
                  </Text>
                  <Spacer />
                </Fragment>
              )
            );
          }
        )}
      </Flex>
    </Flex>
  );
};
