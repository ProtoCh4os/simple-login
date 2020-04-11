import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";
import Layout from "../../components/layout";
import Link from "next/link";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  TextField,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Grid,
} from "@material-ui/core";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        query: "",
      },
      clients: [],
      table: [],
    };

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    Paper;
    axios
      .get("http://localhost:3000/client/list", {
        headers: {
          "x-access-token": Cookies.get("JWT_TOKEN"),
        },
      })
      .then((response) => {
        this.state.clients = response.data.payload;
        this.state.table = this.state.clients;
        this.setState(this.state);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          Router.replace("/login", "/");
        }
      });
  }

  search(e) {
    var query = e.target.value.trim();
    if (query) {
      this.state.table = this.state.clients.filter(
        (client) => client.name.indexOf(query) != -1
      );
    } else {
      this.state.table = this.state.clients;
    }
    this.forceUpdate();
  }

  render() {
    return (
      <Layout>
        <h1>Painel de controle</h1>
        <h3>Clientes</h3>
        <form onSubmit={this.search}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
          >
            <TextField
              onBlur={this.search}
              id="query"
              name="query"
              required
              label="Pesquisar"
            ></TextField>
          </Grid>
        </form>
        <TableContainer component={Paper}>
          <Table className="table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">CPF</TableCell>
                <TableCell align="right">Endereço</TableCell>
                <TableCell align="right">Telefone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.table.map((client) => (
                <TableRow key={client.name}>
                  <TableCell component="th" scope="row">
                    {client.name}
                  </TableCell>
                  <TableCell align="right">{client.doc}</TableCell>
                  <TableCell align="right">{client.address}</TableCell>
                  <TableCell align="right">{client.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{ padding: 10 }}
        >
          <Link href="/client/create">
            <Button variant="contained" color="primary">
              Cadastrar cliente
            </Button>
          </Link>
          <Link href="/user">
            <Button variant="contained" color="primary">
              Gerir Usuários
            </Button>
          </Link>
        </Grid>
      </Layout>
    );
  }
}

export default List;
