import * as React from "react";

export type Asset = {
  name: string;
  balance: string;
  id:string
};

type AssetsContextType = {
  assets: Asset[];
  refetch: () => void;
};

const AssetsContext = React.createContext<AssetsContextType | null>(null);

const AssetsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  const fetchAssets = React.useCallback(async () => {
    try {
      const response = await fetch("/assets");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message ?? "Error while fetching assets");
      }
      setAssets(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const refetch = React.useCallback(() => {
    fetchAssets();
  }, [fetchAssets]);

  return (
    <AssetsContext.Provider
      value={{
        assets,
        refetch,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

const useAssetsContext = () => {
  const context = React.useContext(AssetsContext);
  if (!context) {
    throw new Error("useAssetsContext must be used within a AssetsContext");
  }

  return context;
};

export { AssetsContextProvider, useAssetsContext };
