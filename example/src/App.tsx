import * as React from 'react';
import MatrixText from 'react-matrix-text';
import './App.css';
import './container.css';
import './content.css';

interface ContentProps {
  children: React.ReactNode,
};
const Content: React.SFC<ContentProps> = ({ children }) => (
  <div className="content">
    {children}
  </div>
);

interface ContainerProps {
  children: React.ReactNode,
};
const Container: React.SFC<ContainerProps> = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

class App extends React.Component {
  public render() {
    return (
      <Container>
        <Content>
          <MatrixText
              sentence="THIS IS CORE MEDIA"
              columns={3}
              renderRow={this.renderRow}
              renderColumn={this.renderColumn}
            />
        </Content>
      </Container>
    );
  }

  private renderRow = (columns: JSX.Element[]) => <div className="row">{columns}</div>;
  private renderColumn = (char: string) => <span>{char}</span>;
}

export default App;
