lista = 3*[0]
print(lista)

tupla = (1,2)
tupla_um = (10,)
tupla_sem = 4, 9
conca_tupl = tupla + tupla_sem + tupla_um
print(conca_tupl)
print(1 in tupla)

dicio = dict(
          j = 4.5,
          c = 9.7,
          b = 5.6
)
print(dicio.keys())
print(dicio.values())
print(dicio.get("j"))
print(f"chave {dicio['b']}")

for chave in dicio.keys():
          print(f"chave {chave} e valores {dicio[chave]}")

lista1 = [1,2,3]
lista2 = ["cavalo", "egua"]
lista1.append(lista2)
print(lista1)
lista1.pop(1)
print(lista1)
conju = {1, 2, 3}
conju.add(5)
conju.update([10, 15, 20])
print(conju)