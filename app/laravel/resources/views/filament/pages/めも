<x-filament::page>
    <div class="grid gap-8 lg:grid-cols-2">
        <!-- ミーティング提案 -->
        <div class="space-y-6">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">提案中のミーティング</h2>
            
            <div class="space-y-4">
                @forelse($pendingTasks as $task)
                    <div class="overflow-hidden bg-white rounded-lg ring-1 ring-gray-200">
                        <div class="p-6">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">
                                        {{ $task['title'] }}
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-600">
                                        クライアント: {{ $task['client_name'] }}
                                    </p>
                                </div>
                                <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                                    提案中
                                </span>
                            </div>
                            
                            <p class="mt-3 text-sm text-gray-600">
                                {{ $task['description'] }}
                            </p>

                            <div class="mt-4 border-t border-gray-100 pt-4">
                                <h4 class="text-sm font-medium text-gray-900">提案日時</h4>
                                <div class="mt-2 grid gap-3">
                                    @foreach($task['dates'] as $date)
                                        <div class="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                                            <div class="flex items-center space-x-3">
                                                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-900 text-sm font-medium">
                                                    {{ $date['day_of_week'] }}
                                                </span>
                                                <span class="text-sm text-gray-900">
                                                    {{ $date['datetime'] }}
                                                </span>
                                            </div>
                                            <button
                                                wire:click="confirmDate({{ $date['id'] }})"
                                                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-8 px-3 py-2"
                                            >
                                                この日程を選択
                                            </button>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="rounded-lg bg-gray-50 p-8 text-center">
                        <h3 class="text-sm font-semibold text-gray-900">提案中のミーティングはありません</h3>
                        <p class="mt-2 text-sm text-gray-600">新しいミーティングの提案をお待ちください。</p>
                    </div>
                @endforelse
            </div>
        </div>

        <!-- 確定済みミーティング -->
        <div class="space-y-6">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">確定済みミーティング</h2>
            
            <div class="space-y-4">
                @forelse($recentActivities as $meeting)
                    <div class="overflow-hidden bg-white rounded-lg ring-1 ring-gray-200">
                        <div class="p-6">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">
                                        {{ $meeting->title }}
                                    </h3>
                                    <p class="mt-1 text-sm text-gray-600">
                                        クライアント: {{ $meeting->user->name }}
                                    </p>
                                </div>
                                <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    確定済み
                                </span>
                            </div>
                            
                            <p class="mt-3 text-sm text-gray-600">
                                {{ $meeting->description }}
                            </p>

                            <div class="mt-4 border-t border-gray-100 pt-4">
                                @foreach($meeting->dates as $date)
                                    <div class="flex items-center space-x-3">
                                        <span class="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-900 text-sm font-medium">
                                            {{ $date->proposed_datetime->isoFormat('ddd') }}
                                        </span>
                                        <span class="text-sm text-gray-900">
                                            {{ $date->proposed_datetime->format('Y-m-d H:i') }}
                                        </span>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                @empty
                    <div class="rounded-lg bg-gray-50 p-8 text-center">
                        <h3 class="text-sm font-semibold text-gray-900">確定済みのミーティングはありません</h3>
                        <p class="mt-2 text-sm text-gray-600">ミーティングが確定されるとここに表示されます。</p>
                    </div>
                @endforelse
            </div>
        </div>
    </div>
</x-filament::page>