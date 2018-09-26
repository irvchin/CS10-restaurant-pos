import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

function PartyTablesTitle(props) {
  if (props.tables.length === 0) {
    return (
      <s.Title>
        <span>Takeout</span>
      </s.Title>
    );
  }

  return (
    <s.Title>
      {props.tables.length === 1 ? <span>Table:&nbsp;</span> : <span>Tables:&nbsp;</span>}
      {props.tables.map((table, i) => {
        if (props.tables.length - 1 !== i) {
          return <span key={table.number}><span>#</span>{table.number},&nbsp;</span>;
        }
        return <span key={table.number}><span>#</span>{table.number}</span>;
      })}
    </s.Title>
  );
}

PartyTablesTitle.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of object
};

PartyTablesTitle.defaultProps = {
  tables: [],
};

export default PartyTablesTitle;