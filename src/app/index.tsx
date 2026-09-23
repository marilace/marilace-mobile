import React from 'react';
import {
  View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { Fontes } from '@/constants/Fontes';
import { Cores } from '@/constants/Cores';

export default function EscolhaLoginRegistro() {

  return (
    <ImageBackground
      source={require('@/assets/images/fundo.png')}
      style={styles.fundo}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.conteudo}>
          <View style={styles.topo}>
            <Image
              source={require('@/assets/images/logoExtensa.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.titulo}>Que bom te ver por aqui! :)</Text>

            <Text style={styles.subtitulo}>
              Pronta para fazer parte dessa comunidade?
            </Text>
          </View>

          <View style={styles.botoes}>
            <TouchableOpacity
              style={[styles.botao, styles.botaoVerde]}
              activeOpacity={0.8}
            >
              <Image
                source={require('@/assets/images/estrela1.png')}
                style={styles.estrela}
                resizeMode="contain"
              />
              <Text style={styles.textoBotao}>Entrar em uma conta existente</Text>
              <Image
                source={require('@/assets/images/estrela1.png')}
                style={styles.estrela}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoRosa]}
              activeOpacity={0.8}
            >
              <Image
                source={require('@/assets/images/estrela1.png')}
                style={styles.estrela}
                resizeMode="contain"
              />
              <Text style={styles.textoBotao}>Criar uma nova conta</Text>
              <Image
                source={require('@/assets/images/estrela1.png')}
                style={styles.estrela}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  safeArea: {
    flex: 1,
  },

  conteudo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 56,
  },

  topo: {
    alignItems: 'center',
    marginTop: 32,
  },

  logo: {
    width: 180,
    height: 60,
    marginBottom: 24,
  },

  titulo: {
    fontFamily: Fontes.base,
    fontWeight: '900',
    fontSize: Fontes.XG,
    color: Cores.primaria,
    textAlign: 'center',
    lineHeight: 40,
  },

  subtitulo: {
    fontFamily: Fontes.base,
    fontSize: Fontes.G,
    fontWeight: '600',
    color: Cores.primariaEscura,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 12,
  },

  botoes: {
    gap: 12,
  },

  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: Cores.preto,
  },

  botaoVerde: {
    backgroundColor: Cores.verde,
  },

  botaoRosa: {
    backgroundColor: Cores.rosa,
  },

  estrela: {
    width: 8,
    height: 8,
  },

  textoBotao: {
    fontFamily: Fontes.base,
    fontSize: Fontes.M,
    fontWeight: '700',
    color: Cores.preto,
    textAlign: 'center',
  },

});