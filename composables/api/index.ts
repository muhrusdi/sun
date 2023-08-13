import { UseFetchOptions } from "nuxt/app";
import { KeysOf, PickFrom } from "nuxt/dist/app/composables/asyncData";
import { API } from "~/utils/endpoint";
import { defu } from "defu";
import { QueryResponseType } from "~/types";

export const useHttpBaseUrl = () => {
  if (process.client) return undefined;

  const defaultHost = process.env.NITRO_HOST || process.env.HOST || "localhost";
  const defaultPort = process.env.NITRO_PORT || process.env.PORT || 3000;

  return `http://${defaultHost}:${defaultPort}`;
};

type Options<T, TParams = {}> = {
  params?: TParams;
  query?: TParams;
  options?: UseFetchOptions<T>;
};

// The API was being defined in the utils/enpoints.ts
type PathsType = typeof API;

type PathsKeyType = {
  [K in keyof PathsType]: string;
};

export const useQuery = <T, TParams = {}>(
  path: keyof PathsKeyType,
  options?: Options<T, TParams>
) => {
  let controller: AbortController;

  const urlString = computed(() => {
    let paramsString = "";
    let optionParams = unref(options?.params);
    if (optionParams) {
      for (const key in optionParams) {
        paramsString += `/${optionParams[key]}`;
      }
    }
    return API[path] + paramsString;
  });

  const _options = reactive({
    ...options?.options,
    params: options?.query as any,
  });

  const _immediate = computed(() => options?.options?.immediate);

  return useAsyncData<QueryResponseType<T>>(
    urlString.value,
    async () => {
      // controller?.abort?.();
      controller =
        typeof AbortController !== "undefined"
          ? new AbortController()
          : ({} as AbortController);

      const _$fetch = useRequestFetch();

      return _$fetch(urlString.value, {
        signal: controller.signal,
        onRequest({ options }) {
          const accessToken = useCookie("oauth/token", { default: undefined });

          if (accessToken) {
            options.headers = new Headers(options.headers);
            options.baseURL = useHttpBaseUrl();
            options.headers.append(
              "Authorization",
              `Bearer ${accessToken.value}`
            );
          }
        },
        ..._options,
      });
    },
    {
      immediate: _immediate.value,
      watch: [...(options?.options?.watch || [])],
    }
  );
};

type ReturnType<T> = Ref<PickFrom<T, KeysOf<T>> | null>;

export const useMutation = <T extends Record<string, any>, TParams = null>(
  path: keyof PathsKeyType,
  options?: Options<T, TParams>
) => {
  const urlString = computed(() => {
    let paramsString = "";
    let optionParams = unref(options?.params);
    if (optionParams) {
      for (const key in optionParams) {
        paramsString += `/${optionParams[key]}`;
      }
    }
    return API[path] + paramsString;
  });

  const data = ref<ReturnType<T>>();
  const error = ref();
  const pending = ref(false);

  const accessToken = useCookie("oauth/token", { default: undefined });

  const defaults: UseFetchOptions<T> = {
    headers: accessToken ? { Authorization: accessToken.value as string } : {},
  };

  const params = defu(options?.options, defaults);

  const mutate = async (formData: T) => {
    pending.value = true;
    return useFetch(urlString, {
      method: "post",
      ...params,
      body: formData,
    }).then((d) => {
      pending.value = false;
      data.value = d.data;
    });
  };

  return {
    mutate,
    pending,
    data,
    error,
  };
};
