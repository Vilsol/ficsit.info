import { EntityKind } from '@local/schema';
import { css } from '@emotion/core';

import { sizing, colors } from '~/style';

import { EntityList } from './EntityList';
import { useState } from 'react';
import { EntityListItem } from './EntityListItem';
import { useEntity } from '~/data';

const rowHeight = 40;

const rootStyles = css({
  position: 'relative',
  width: sizing.sidebarWidth,
  height: rowHeight,
  '&:hover': {
    zIndex: 10,
  },
});

const entityListStyles = css({
  position: 'absolute',
  borderRadius: 4,
  top: 0,
  left: 0,
  height: rowHeight * 8,
  width: '100%',
  backgroundColor: colors.Light.N100,
  zIndex: 1000,
  boxShadow: `0 0 4px 2px rgba(0, 0, 0, 0.25)`,
  '> input': {
    height: rowHeight,
  },
});

const selectedEntityStyles = css({
  display: 'flex',
  height: rowHeight,
  border: `2px solid ${colors.Light.N400}`,
  backgroundColor: colors.Light.N100,
  borderRadius: 4,
  '&:hover': {
    border: `2px solid ${colors.Primary.N500}`,
  },
});

export interface EntityChooserProps {
  kind: EntityKind;
  slug?: string;
  setSlug: (newSlug: string) => void;
}

export function EntityChooser({ kind, slug, setSlug }: EntityChooserProps) {
  const [editing, setEditing] = useState(false);
  const entity = useEntity(slug);

  if (editing) {
    return (
      <div
        css={rootStyles}
        onBlur={() =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setEditing(false)),
          )
        }>
        <EntityList
          autoFocus
          kind={kind}
          rowHeight={rowHeight}
          css={entityListStyles}
          selected={slug}
          onChange={(newSlug: string) => {
            setEditing(false);
            setSlug(newSlug);
          }}
        />
      </div>
    );
  } else if (entity) {
    return (
      <div css={rootStyles}>
        <EntityListItem
          css={selectedEntityStyles}
          entity={entity}
          onClick={() => setEditing(true)}
          height={rowHeight}
        />
      </div>
    );
  } else {
    return (
      <div css={rootStyles}>
        <div css={selectedEntityStyles} onClick={() => setEditing(true)}>
          Choose One…
        </div>
      </div>
    );
  }
}
