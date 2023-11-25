## `GET` /api/player/{name}
Retorna informações públicas ou privadas de um usuário, dependendo se o id é dado ou não

caso somente as partes públicas sejam requisitadas, outras áreas receberão `null`

### Corpo:

```ts
{
    "playerid": string, /// opcional
}
```

### Resposta

```ts
{
    "playertag": string, /// pública
    "password": string | null, /// privada
    "inventory": string | null, // privada
    
    "position": { /// pública
        "planet": number | null,
        "system": number | null, 
        "galaxy": number | null,
        "real": number,
        "imag": number,
        "perp": number,
    },

    "traveling" : { // pública
        "planet": number | null, 
        "system": number | null, 
        "galaxy": number | null, 
        "real": number,
        "imag": number,
        "perp": number,
    } | null
}
```

## `GET` /api/player/getNearby

Recebe todos os jogadores próximos do jogador atual, se o jogador estiver em um planeta ou sistema, retorna todos os jogadores do sistema, fora isso, retorna os 100 mais próximos ou todos num raio de 10⁸ km

### Corpo: 


```ts
{
    "playerid": string /// necessário
}
```

### Resposta:

```ts
{
    "ok": boolean,
    "count": number,
    "players": [
        {
            "name": string,
            "pos": {
                "real": number,
                "imag": number,
                "perp": number
            },
            "color": string
        }
    ]
}
```

## `POST` /api/player/travelTo

Posiciona o jogador em um lugar específico

### Corpo

```ts
{
    "playerid": string
    "toGalaxy": number | null, // null em caso do destino = saída
    "toSystem": number | null, 
    "toPlanet": number | null,
    "position": {
        "real": number,
        "imag": number,
        "perp": number
    }
}
```

### Resposta

```ts
{
    "enoughFuel": boolean,
    "timeDelta": string | null // formato ISO
}
```

## `POST` /api/player/fabricate 

Fabrica uma determinada peça/receita

### Corpo:

```ts
{
    "playerid": string,
    "recipeId": number
}
```

### Resposta: 

```ts
{
    "ok": boolean,
    "timeDelta": string | null
}
```

