import React, { PureComponent } from 'react';
import MatrixText from 'react-matrix-text';
import './App.css';

const App = ({ sentence, columns }) => (
  <div className="container">
    <div className="content">
      <MatrixText
        sentence={sentence}
        columns={columns}
        renderRow={(cols) => <div className="not-row">{cols}</div>}
      />
    </div>
  </div>
);

export default App;
