export interface Service<TPar, TRes> {
  Run(parameter: TPar): Promise<TRes>;
}
