import { StatusBar } from "expo-status-bar";
import moment from "moment-timezone";
import React from "react";
import { LocaleConfig } from "react-native-calendars";
import { AuthProvider } from "./src/context/auth";
import Routes from "./src/routes/index";

const App = () => {
  moment.tz.setDefault("America/Sao_Paulo");
  moment.locale("pt-br");
  LocaleConfig.locales["pt"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    dayNames: [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt";

  return (
    <>
      <AuthProvider>
        <StatusBar style="light" backgroundColor="#FE9D2A" />
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
