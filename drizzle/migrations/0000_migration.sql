CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nombre text NOT NULL CHECK (char_length(nombre) BETWEEN 2 AND 100),
  tipo_cliente text NOT NULL CHECK (tipo_cliente IN ('persona','empresa')),
  whatsapp text NOT NULL CHECK (char_length(whatsapp) BETWEEN 7 AND 30),
  email text CHECK (email IS NULL OR char_length(email) <= 254),
  necesidad text NOT NULL CHECK (char_length(necesidad) <= 100),
  descripcion text NOT NULL CHECK (char_length(descripcion) BETWEEN 10 AND 2000),
  origen text NOT NULL DEFAULT 'web' CHECK (char_length(origen) <= 200),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','quoted','won','lost'))
);
CREATE INDEX contact_requests_created_idx ON public.contact_requests (created_at DESC);
CREATE INDEX contact_requests_whatsapp_idx ON public.contact_requests (whatsapp, created_at DESC);

GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
-- No anon/authenticated policies: the browser has no direct access.
-- Inserts happen only through submit_contact_request (rate limited).

CREATE OR REPLACE FUNCTION public.submit_contact_request(
  _nombre text, _tipo_cliente text, _whatsapp text, _email text,
  _necesidad text, _descripcion text, _origen text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE new_id uuid; recent int;
BEGIN
  SELECT count(*) INTO recent FROM public.contact_requests
   WHERE whatsapp = _whatsapp AND created_at > now() - interval '10 minutes';
  IF recent >= 3 THEN RAISE EXCEPTION 'rate_limited' USING ERRCODE = 'P0001'; END IF;
  IF EXISTS (SELECT 1 FROM public.contact_requests
     WHERE whatsapp = _whatsapp AND descripcion = _descripcion AND created_at > now() - interval '1 hour')
  THEN RAISE EXCEPTION 'duplicate' USING ERRCODE = 'P0001'; END IF;
  INSERT INTO public.contact_requests (nombre, tipo_cliente, whatsapp, email, necesidad, descripcion, origen)
  VALUES (_nombre, _tipo_cliente, _whatsapp, NULLIF(_email,''), _necesidad, _descripcion, COALESCE(NULLIF(_origen,''),'web'))
  RETURNING id INTO new_id;
  RETURN new_id;
END $$;
REVOKE ALL ON FUNCTION public.submit_contact_request(text,text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_contact_request(text,text,text,text,text,text,text) TO anon, authenticated;