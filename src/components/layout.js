import { Container } from "@material-ui/core";
import "../assets/style/app.sass";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container maxWidth="sm" className="layout-body">
        {this.props.children}
      </Container>
    );
  }
}

export default Layout;
