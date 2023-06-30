import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useParcelados from "../../hooks/useParcelados";
import { Parcela, ParcelaData } from "../../hooks/useParcelados/useParcelados";
import useCarteira, { Carteira } from "../../hooks/useCarteira/useCarteira";
import useLancamentos, {
  LacamentosData,
  LacamentosType,
} from "../../hooks/useLancamentos/useLancamentos";
import useExtras, {
  ExtraData,
  ExtraType,
} from "../../hooks/useExtras/useExtras";

type FinanProviderProps = {
  children: React.ReactNode;
};

export const FinanContext = createContext({} as FinanContextData);

interface intUser {
  id: string;
  name: string;
}

type FinanContextData = {
  user: intUser;
  carteira: Carteira | undefined;
  parcelados: ParcelaData | undefined;
  lancamentos: LacamentosData;
  extras: ExtraType;
  addParcelado: (newItem: Partial<Parcela>) => void;
  delParcelado: (idItem: string) => void;
  updateParcelado: (newItem: Parcela) => void;
  addLancamento: (newItem: Partial<LacamentosType>) => void;
  delLancamento: (idDel: string) => void;
  addExtra: (param: ExtraData) => void;
  updateExtra: (item: ExtraType) => void;
  setUser: (newUser: intUser) => void;
  getDadosParcelados: (user: string) => void;
  applayCarteira: (carteira: Partial<Carteira>) => void;
  applyExtraItem: (extra: ExtraData) => void;
  deleteExtra: (extraId: number) => void;
  AtualizarDadosFinan: () => void;
  AtualizarDadosGeral: () => void;
};

export const FinanProvider = ({ children }: FinanProviderProps) => {
  const {
    getDadosParcelados,
    data: parcelados,
    insertParcela,
    delParcela,
  } = useParcelados();

  const { data: carteira, getDadosCarteira, updateCarteira } = useCarteira();

  const {
    data: dataLancamentos,
    getDadosLancamentos,
    delCarteira,
    insertLancamento,
  } = useLancamentos();

  const {
    data: dataExtra,
    updateLancamento,
    getDadosExtra,
    delExtra,
  } = useExtras();

  const [user, setUser] = useState<intUser>({ id: "", name: "" });
  const [lancamentos, setLancamentos] = useState<LacamentosData>([]);
  const [extras, setExtras] = useState<ExtraType>([]);

  const getUser = (idUser?: string) => {
    if (idUser && idUser !== "") {
      return idUser;
    }

    if (!!user.id && user.id !== "") {
      return user.id;
    }

    return localStorage.getItem("user-id") || "undefined";
  };

  /* eslint-disable */
  useEffect(() => {
    const idUser = localStorage.getItem("user-id");
    const nameUser = localStorage.getItem("user-name");

    if (idUser && nameUser && user.id === "") {
      setUser({ id: idUser, name: nameUser });
    }
  }, []);
  /* eslint-enable */

  const addParcelado = (newItem: Partial<Parcela>) => {
    insertParcela(newItem as Parcela).then(() => {
      alert("Cadastro realizado com sucesso");
      getDadosParcelados(user?.id);
    });
  };

  const delParcelado = (idItem: string) => {
    delParcela(idItem).then(() => {
      alert("deletado parcela com sucesso");
      getDadosParcelados(user?.id);
    });
  };

  const updateParcelado = (itemUpdate: Parcela) => {
    insertParcela(itemUpdate as Parcela).then(() => {
      alert("Cadastro atualziado com sucesso");
      getDadosParcelados(user?.id);
    });
  };

  const addLancamento = (newItem: Partial<LacamentosType>) => {
    if (!newItem) {
      return;
    }
    const paramUser = getUser(user.id);

    insertLancamento({ ...newItem, user: paramUser }).then((response) => {
      if (response.data.sucess) {
        getDadosLancamentos(paramUser);
      }
    });
  };

  const delLancamento = (idDel: string) => {
    delCarteira(idDel).then((response) => {
      if (response.data.sucess) {
        getDadosLancamentos(user.id);
      }
    });
  };

  const addExtra = (item: ExtraData) => {
    !!item && setExtras((old) => [...old, item]);
  };

  const updateExtra = (data: ExtraData[]) => {
    setExtras(data);
  };

  const applyExtraItem = (data: ExtraData) => {
    updateLancamento(data).then((response) => {
      if (response.data.sucess) {
        setExtras((old) => [
          ...old.filter(
            (item) => !!item._id && item._id !== response.data.extra._id
          ),
          { ...response.data.extra, isState: "unknown" },
        ]);
      }
    });
  };

  const deleteExtra = (extraId: number) => {
    const itemDelete = extras.find((item, key) => key === extraId);
    try {
      if (!!itemDelete?._id) {
        delExtra(itemDelete._id).then((response) => {
          if (response.data.sucess) {
            console.log("deletado", response.data);
          }
        });
      }
      setExtras((old) => [...old.filter((item, key) => key !== extraId)]);
    } catch {
      alert("ouve um problema.");
    }
  };

  const applayCarteira = useCallback((data: Partial<Carteira>) => {
    if (!data) {
      return;
    }
    console.log("applyCarteira", { data });
    const paramUser = getUser(data.user);

    updateCarteira({ ...data, user: paramUser }).then((response) => {
      if (response?.data.sucess) {
        getDadosCarteira(paramUser);
      }
    });
  }, []);

  const AtualizarDadosFinan = () => {
    const paramUser = getUser();
    getDadosCarteira(paramUser);
    getDadosLancamentos(paramUser);
    getDadosExtra(paramUser);
  };

  const AtualizarDadosGeral = () => {
    const paramUser = getUser();
    getDadosCarteira(paramUser);
    getDadosLancamentos(paramUser);
    getDadosExtra(paramUser);
    getDadosParcelados(paramUser);
  };

  useMemo(() => {
    if (dataLancamentos) {
      setLancamentos(dataLancamentos);
    }
  }, [dataLancamentos]);

  useMemo(() => {
    if (dataExtra) {
      setExtras(dataExtra);
    }
  }, [dataExtra]);

  const finan = {
    user,
    carteira,
    parcelados,
    lancamentos,
    extras,
    addParcelado,
    delParcelado,
    updateParcelado,
    addLancamento,
    delLancamento,
    addExtra,
    updateExtra,
    setUser,
    getDadosParcelados,
    applayCarteira,
    applyExtraItem,
    deleteExtra,
    AtualizarDadosFinan,
    AtualizarDadosGeral,
  };
  return (
    <FinanContext.Provider value={finan}>{children}</FinanContext.Provider>
  );
};

export const useFinanContext = () => useContext(FinanContext);
