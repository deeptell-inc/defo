<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionSection from '@/Components/ActionSection.vue';
import DangerButton from '@/Components/DangerButton.vue';
import DialogModal from '@/Components/DialogModal.vue';
import InputError from '@/Components/InputError.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    setTimeout(() => passwordInput.value.focus(), 250);
};

const deleteUser = () => {
    form.delete(route('current-user.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;

    form.reset();
};
</script>

<template>
    <ActionSection>
        <template #title>
            アカウント削除
        </template>

        <template #description>
            アカウントを完全に削除します。
        </template>

        <template #content>
            <div class="max-w-xl text-sm text-gray-600">
                アカウントが削除されると、そのリソースとデータはすべて完全に削除されます。アカウントを削除する前に、保持したいデータや情報をダウンロードしてください。
            </div>

            <div class="mt-5">
                <DangerButton @click="confirmUserDeletion">
                    アカウント削除
                </DangerButton>
            </div>

            <!-- アカウント削除確認モーダル -->
            <DialogModal :show="confirmingUserDeletion" @close="closeModal">
                <template #title>
                    アカウント削除
                </template>

                <template #content>
                    本当にアカウントを削除してもよろしいですか？アカウントが削除されると、そのリソースとデータはすべて完全に削除されます。アカウントを完全に削除することを確認するために、パスワードを入力してください。

                    <div class="mt-4">
                        <TextInput
                            ref="passwordInput"
                            v-model="form.password"
                            type="password"
                            class="mt-1 block w-3/4"
                            placeholder="パスワード"
                            autocomplete="current-password"
                            @keyup.enter="deleteUser"
                        />

                        <InputError :message="form.errors.password" class="mt-2" />
                    </div>
                </template>

                <template #footer>
                    <SecondaryButton @click="closeModal">
                        キャンセル
                    </SecondaryButton>

                    <DangerButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        アカウント削除
                    </DangerButton>
                </template>
            </DialogModal>
        </template>
    </ActionSection>
</template>
