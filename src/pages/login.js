import axios from "axios";
import Link from "next/link";
import Layout from "../components/layout";
import { Button, Grid } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { SHA256 } from "crypto-js";
import Router from "next/router";
import Cookies from 'js-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        pass: "",
      },
    };
    this.changeState = this.changeState.bind(this);
    this.auth = this.auth.bind(this);

    this.bStyle = {
      margin: "10px 20px",
    };
  }

  changeState(e) {
    this.state.form[e.target.id] = e.target.value.trim();
    this.setState(this.state);
  }

  auth(e) {
    e.preventDefault();
    if (!this.state.form.name || !this.state.form.pass) {
      return alert("Por favor preencha os campos!");
    }

    var form = this.state.form;
    const pass = this.state.form.pass;
    form.pass = SHA256(form.pass).toString();

    axios
      .post("http://localhost:3000/login", form)
      .then((response) => {
        if (response.data.code == 200) {
          Cookies.set("JWT_TOKEN", response.data.payload.token);
          Router.push("/client");
        }
      })
      .catch((err) => {
        if (err.response.status == 404) {
          alert("User not found or incorrect password");
        }
      })
      .then(() => {
        this.state.form.pass = pass;
        this.setState(this.state);
      });
  }

  render() {
    return (
      <Layout>
        <ValidatorForm ref="form" onSubmit={this.auth}>
          <h1>Sistema de Clientes</h1>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <TextValidator
              onChange={this.changeState}
              id="name"
              name="name"
              value={this.state.form.name}
              required
              label="Usuário"
            ></TextValidator>
            <TextValidator
              type="password"
              value={this.state.form.pass}
              onChange={this.changeState}
              name="pass"
              id="pass"
              required
              label="Senha"
            ></TextValidator>
          </Grid>
          <Grid container direction="column" justify="space-around">
            <Button
              type="submit"
              style={this.bStyle}
              variant="contained"
              color="primary"
            >
              Entrar
            </Button>
            <Link href="/signup">
              <Button style={this.bStyle} variant="contained" color="primary">
                Cadastrar
              </Button>
            </Link>
          </Grid>
        </ValidatorForm>
      </Layout>
    );
  }
}

export default Login;
